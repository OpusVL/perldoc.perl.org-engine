#============================================================= -*-Perl-*-
#
# Pod::POM::Node::Verbatim
#
# DESCRIPTION
#   Module implementing specific nodes in a Pod::POM, subclassed from
#   Pod::POM::Node.
#
# AUTHOR
#   Andy Wardley   <abw@kfs.org>
#   Andrew Ford    <a.ford@ford-mason.co.uk>
#
# COPYRIGHT
#   Copyright (C) 2000, 2001 Andy Wardley.  All Rights Reserved.
#   Copyright (C) 2009 Andrew Ford.  All Rights Reserved.
#
#   This module is free software; you can redistribute it and/or
#   modify it under the same terms as Perl itself.
#
# REVISION
#   $Id: Verbatim.pm 76 2009-08-20 20:41:33Z ford $
#
#========================================================================

package Pod::POM::Node::Verbatim;

use strict;

use parent qw( Pod::POM::Node );
use vars qw( %ATTRIBS $ERROR );

%ATTRIBS = ( text => '' );

sub present {
    my ($self, $view) = @_;
    $view ||= $Pod::POM::DEFAULT_VIEW;
    return $view->view_verbatim($self->{ text });
}

1;

=head1 NAME

Pod::POM::Node::Verbatim -

=head1 SYNOPSIS

    use Pod::POM::Nodes;

=head1 DESCRIPTION

This module implements a specialization of the node class to represent verbatim elements.

=head1 AUTHOR

Andrew Ford E<lt>a.ford@ford-mason.co.ukE<gt>

Andy Wardley E<lt>abw@kfs.orgE<gt>

=head1 COPYRIGHT

Copyright (C) 2000, 2001 Andy Wardley.  All Rights Reserved.

Copyright (C) 2009 Andrew Ford.  All Rights Reserved.

This module is free software; you can redistribute it and/or
modify it under the same terms as Perl itself.

=head1 SEE ALSO

Consult L<Pod::POM::Node> for a discussion of nodes.
